const { validationResult } = require('express-validator');

const postOriginal = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } else {
        const result = await fetch(req.body.anytext);

        if (result.status === 200) {
            const output = await result.json();
            res.send({
                original: output,
                transformed: transformObject(output)
            });
        } else {
            res.status(result.status).send(result.statusText);
        }
    }
};

const transformObject = (input) => {
    if (typeof input !== 'object' || input === null) {
        return input;
    }

    const output = Array.isArray(input) ? [] : {};

    for (const key in input) {
        if (input.hasOwnProperty(key)) {
            const newKey = key.replace(/[eE]/g, 'E'); // Replace 'e' or 'E' with 'E'
            const newValue = transformObject(input[key]);
            const countE = key.match(/[eE]/g) ? key.match(/[eE]/g).length : 0; // Count 'E' or 'e'

            if (!Array.isArray(output)) {
                if (countE > 0) {
                    output[`countE`] = countE;
                }
                output[newKey] = newValue;
            } else {
                output.push(newValue);
            }
        }
    }

    return output;
}


module.exports = {
    postOriginal
};