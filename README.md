# Chatset
Una paqueña plataforma que implementa mensajeria en tiempo real, permite la creación de grupos

<hr>

## Listado de Eventos
Listado de eventos, relacionados a la interactividad con el chat

### Sesiones
    - connection
    - disconnect
    
###  Conversaciones
    - conversation create - Se crea una conversación
    - conversation remove - Se elimina una conversación
    - conversation spam - Se califica como spam una conversacion
    - coversation open - Se abre una conversacion, lista mensajes de una conversacion
    - conversation close - Se cierra una conversacion
    - conversation list - Se lista conversaciones
    - conversation data - Se envia detalle de una conversacion

### Mensajes
    - message add - Se agrega un mensaje / Envia
    - message reply - Se responde un mensaje

### Integrantes (Revisar)
    - group create - Se crea grupo
    - group delete - Se elimina grupo
    - group user add  - Se agrega usuario a un grupo
    - group user remove - Se elimina usuario de un grupo
    - group user admin add - Se agrega usuario como administrador
    - group user admin remove - Se elimina usuario como administrador
    - group user list - Se listan los usuarios de un grupo
    
### Usuarios
    - user register - Se crea cuenta de usuario
    - user unregister - Se elimna cuenta de usuario
    - user list - Se listan los usuarios
    - user data - Se emite informacion del usuario, para almacenamiento interno, temporal

### Contacto
    - contact user add - Se agrega usuario como contacto
    - contact user remote - Se elimina usuario como contacto
    - contact list - Se listan los contactos

### API
Por defecto para la versión uno, se agrega el prefijo /api/v1/{recurso}

- users: /api/v1/users
- conversations : /api/v1/conversations
- messages : /ap1/v1/messages

### Sockets
- socket.emit -> Se emiten eventos, envia datos [server-client] o viceversa
- socket.on -> Entorno sobre el que se ejecuta la emision de un evento


## Backend
- NodeJS
- MongoDB
- Mongoosejs
- Socket.io
- Expressjs

<hr>

### Iniciar el servicio
    npm start

Por defecto se ejecuta en el puerto 3000


