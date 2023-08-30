const Handlebars = require("handlebars");

Handlebars.registerHelper("isAdministradorSupervisor", (value) => {
	return value === "Administrador" || value === "Supervisor";
});

Handlebars.registerHelper("isAgente", (value) => {
	return value === "Agente" || value === "Asesor";
});

Handlebars.registerHelper('existeAdjunto', (value) => {
	return value;
});