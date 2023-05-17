import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { validateFormProfile } from "../../../helpers/validateForm";
import { useUserStore } from "../../../hooks/useUserStore";


export const useProfiles = () => {

    const { user } = useSelector((state) => state.auth);

    const { updateUserProfile, updateUserPrivateProfile } = useUserStore();

    const [form, setForm] = useState([]);
    const [order, setOrder] = useState([]);
    const [validate, setValidate] = useState('');

    const navigate = useNavigate();


    const serializeForm = (serialForm) => {

        const data = {};
        const formData = new FormData(serialForm);

        for (let [key, value] of formData) {

            if (value.length > 1000)
                delete data.key

            else
                data[key] = typeof value === 'string' ? value.trim() : value;
        };

        return { data, formData };
    };



    const handleOnClick = (ev, type) => {
        ev.preventDefault();

        const id = Date.now();

        setForm(prevForm => ([
            ...prevForm,
            {
                typeInput: type,
                content: '',
                name: `${type}-${id}`,
                id: `${type}-${id}`
            }
        ]));

        setOrder([
            ...order,
            `${type}-${id}`
        ])

    };



    const handleImageSelect = (ev) => {
        ev.preventDefault();

        const ind = form.findIndex(el => el.id == ev.target.id);
        const newInput = form[ind];

        const reader = new FileReader();
        reader.onload = (ev) => {

            const newForm = [
                ...form.slice(0, ind),
                { ...newInput, content: ev.target.result },
                ...form.slice(ind + 1)
            ];
            setForm(newForm);
        };
        reader.readAsDataURL(ev.target.files[0]);
    };



    const handleOnSubmit = async (ev, isPrivate = false) => {
        ev.preventDefault();


        const { data, formData } = serializeForm(ev.target);

        const validateOK = validateFormProfile(data);
        if (!validateOK) {
            setValidate('No puedes dejar campos vacíos...');

            setTimeout(() => {
                setValidate('');
            }, 3000)
            return
        }

        if (!data) {
            setValidate('Tienes que agregar aunque sea 1 elemtento para continuar...');

            setTimeout(() => {
                setValidate('');
            }, 3000)
            return
        }

        let response;
        if (!isPrivate)
            response = await updateUserProfile(formData);

        else
            response = await updateUserPrivateProfile(formData);

        if (!response.ok) return

        navigate('/');

    };


    const handleOnChange = (target) => {

        setForm((prevForm) =>
            prevForm.map((el) => {
                if (el.id === target.id)
                    return { ...el, content: target.value };

                return el;
            })
        );

    };



    const handleMoveUp = (ev, id) => {
        ev.preventDefault();

        const ind = order.findIndex(ord => ord == id);
        if (ind == 0) return

        const newOrder = [...order];
        const newForm = [...form];

        newOrder.splice(ind - 1, 0, order[ind]);
        newOrder.splice(ind + 1, 1);

        newForm.splice(ind - 1, 0, form[ind]);
        newForm.splice(ind + 1, 1);

        setForm(newForm);
        setOrder(newOrder);
    };



    const handleMoveDown = (ev, id) => {
        ev.preventDefault();

        const ind = order.findIndex(ord => ord == id);
        if (ind == order.length - 1) return

        const newOrder = [...order];
        const newForm = [...form];

        newOrder.splice(ind + 2, 0, order[ind]);
        newOrder.splice(ind, 1);

        newForm.splice(ind + 2, 0, form[ind]);
        newForm.splice(ind, 1);

        setForm(newForm);
        setOrder(newOrder);
    };


    const handleRemove = (ev, id) => {
        ev.preventDefault();

        const ind = order.findIndex(ord => ord == id);

        const newOrder = [...order];
        const newForm = [...form];

        newOrder.splice(ind, 1);
        newForm.splice(ind, 1);

        setForm(newForm);
        setOrder(newOrder);
    };


    const loadForm = () => {

        setOrder(user.profileOrder);
        const newForm = [...user.profile];

        setForm(newForm);
    };


    const loadFormPrivate = () => {

        setOrder(user.privateProfileOrder);
        const newForm = [...user.privateProfile];

        setForm(newForm);
    };

    return {
        loadFormPrivate,
        handleMoveUp,
        handleMoveDown,
        handleRemove,
        loadForm,
        handleOnChange,
        handleOnSubmit,
        handleImageSelect,
        handleOnClick,
        validate,
        form,
        order
    }
}
