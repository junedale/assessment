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


module.exports = transformObject;



