const Usuarios = require("../models/Usuario.model");

const Login = async (req, res) => {
    const { Name_usuario, Password_usuario } = req.body;
    console.log(Name_usuario, Password_usuario);

    try {
     
        const usuario = await Usuarios.findOne({ where: { Name_usuario: Name_usuario } });
        console.log(usuario);

        if (!usuario) {
            return res.status(401).json({ message: 'Usuario no Encontrado' });
        }

      
        if (usuario.Estado_Bloqueo) {
            return res.status(403).json({ message: 'Cuenta bloqueada' });
        }

   
        if (Password_usuario === usuario.Password_usuario) {
            
            await usuario.update({ Estado_Intentos: 0 });
            return res.status(200).json({ access: true }); 
        } else {
 
            const nuevosIntentos = usuario.Estado_Intentos + 1;

            if (nuevosIntentos >= 3) {

                await usuario.update({ Estado_Intentos: nuevosIntentos, Estado_Bloqueo: true });
                return res.status(403).json({  access: false,message: 'Cuenta bloqueada por demasiados intentos fallidos' });
            } else {
                await usuario.update({ Estado_Intentos: nuevosIntentos });
                return res.status(401).json({ access: false,message: 'Contraseña incorrecta' });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = { Login };
