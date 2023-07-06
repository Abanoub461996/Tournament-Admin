interface RegexTypes {
	emailRegex: any ;
	passwordRegex: any;
	urlRegex: any;
}

export const regex: RegexTypes = {
	emailRegex:
		/^((([a-z]|\d|[!#\$%&'\*\+\-/=\?\^_`{\|}~]|[ ])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{|}~]|[ ])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[ ])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[ ]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[ ])|(([a-z]|\d|[ ])([a-z]|\d|-|\.|_|~|[ ])*([a-z]|\d|[ ])))\.)+(([a-z]|[ ])|(([a-z]|[ ])([a-z]|\d|-|\.|_|~|[ ])*([a-z]|[ ])))$/i,
	passwordRegex: / * {8,20}/i,
	urlRegex: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
};
