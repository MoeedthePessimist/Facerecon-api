import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: '30eb3908ce47415db467b68bba1c726a'
});


export const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with api'));
}

export const handleImage = (req, res, postg) => {
    const { id } = req.body;
    postg('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries);
    })
    .catch(err => res.status(400).json('unable to get entries'));
}

