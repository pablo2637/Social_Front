import { userAPI } from '../../api/userAPI';

describe('Test de React', () => {

    test('userAPI debe retornar un objeto con los usuarios', async () => {

        const data = { type: 'getUsers' };

        await expect(userAPI(data)).resolves.toEqual(expect.objectContaining({ ok: true })
        );

    });

    test('userAPI debe retornar un objeto con los amigos pasandole un _id', async () => {

        const data = {
            type: 'getFriends',
            _id: '64582a52bb57aacb29692035'
        };

        await expect(userAPI(data)).resolves.toEqual(expect.objectContaining({ ok: true })
        );

    });


    test('userAPI debe retornar un objeto con los perfiles', async () => {

        const data = { type: 'getProfiles' };

        await expect(userAPI(data)).resolves.toEqual(expect.objectContaining({ ok: true })
        );

    });

    test('userAPI debe retornar un objeto con las invitaciones', async () => {

        const data = { type: 'getInvites' };

        await expect(userAPI(data)).resolves.toEqual(expect.objectContaining({ ok: true })
        );

    });

    test('userAPI debe retornar un objeto con los datos de un usuario pasandole un email', async () => {

        const data = {
            type: 'email',
            email: 'pepe@correo.es'
        };

        await expect(userAPI(data)).resolves.toEqual(expect.objectContaining({ ok: true })
        );

    });


})


