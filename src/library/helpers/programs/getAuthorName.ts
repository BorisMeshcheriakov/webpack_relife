import { Author } from "library/models/programs";
import { getInitial } from "../user";

const getAuthorName = (author?: Author) => {
    let name = '';
    if (author) {
        const { last_name, first_name, middle_name } = author;
        name = getInitial(first_name, middle_name, last_name);
    }
    return name;
};

export default getAuthorName