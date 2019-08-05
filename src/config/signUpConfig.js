export default {
    hideAllDefaults: true,
    signUpFields: [
        {
            label: 'Username',
            key: 'username',
            required: true,
            displayOrder: 1,
            type: 'string'
        },
        {
            label: 'Email',
            key: 'email',
            required: true,
            displayOrder: 2,
            type: 'string',
            signUpWith: true
        },
        {
            label: 'Password',
            key: 'password',
            required: true,
            displayOrder: 3,
            type: 'password'
        }
    ]
};
