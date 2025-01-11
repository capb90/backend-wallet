import { envs } from '@backend-wallet/env';
import nodemailer from 'nodemailer';

const transporterEmail = nodemailer.createTransport({
  service: envs.MAILER_SERVICE,
  auth: {
    user: envs.MAILER_EMAIL,
    pass: envs.MAILER_SECRET_KEY,
  },
});

transporterEmail.verify((error)=>{
    if(error){
        //TODO:Manage logs
        console.error('Error en la configuración de correo',error)
    }else{
        console.log('Servidor SMTP listo para enviar correos');
    }
})


export default transporterEmail;