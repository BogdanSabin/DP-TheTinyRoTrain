module.exports = {
    local: {
        mongodb: 'mongodb://localhost:27017/tinyrotrain',
        passCrypter: {
            algorithm: 'aes-256-cbc',
            key: 'lslj@{0RwFDAKqS3l0Q8q(ET4$5bgiwl',
            iv: 'XJ3LWoLw:1zD!}wf'
        },
        server: {
            main_server: {
                hostname: "localhost",
                port: 11010
            }
        },
        client: {
            portocol: "http",
            hostname: "localhost",
            port: 4200
        },
        secret: {
            auth: "HYtvL7Of8KcZbdomUAeVRJmd61WUycOrJYSkmZzN",
            email: "aBVEUj9bJveUiPokFUIumGBFsTnuqAXwGRVGPgyn"
        },
        gmail: {
            email: 'tinyrotrain@gmail.com',
            password: 'Tinyrotrain123'
        }
    }
}