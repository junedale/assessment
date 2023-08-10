

const getIndex = (req, res) => {
    if (!req.session.queries) {
        req.session.queries = [];
    }

    res.render('index', { title: 'Query', queries: req.session.queries })
};

const postIndex = async (req, res) => {
    const { anytext } = req.body;

    try {
        if (!req.session.queries) {
            req.session.queries = [];
        } else if (req.session.queries.length >= 5) {
            req.session.queries.shift();
        }
        req.session.queries.push(anytext);

        const response = await fetch('http://localhost:3001/api/process/original', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),

        });

        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);

        res.render('index', { title: 'Query', queries: req.session.queries, data });
    } catch (error) {
        console.error('Error:', error);
        res.render('error', { error })
    }
};




module.exports = {
    getIndex,
    postIndex
};