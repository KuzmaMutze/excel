export function capitalize(string) {
	if(typeof string !== "string"){
		return ""
	}

	return "on" + string[0].toUpperCase() + string.slice(1)
}