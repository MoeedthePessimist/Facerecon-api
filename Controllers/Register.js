const register = (req, res, postg, bcrypt) => {
    const { email, name, password } = req.body;
    
    if(!email || !name || !password)
        return res.status(400).json('incorrect form submisssion');

    const hash = bcrypt.hashSync(password);

    postg.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email,
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date(),
            }).then(user => {
                res.json(user[0]);
            }).catch(err => res.status(400).json('Unable to register'));
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to register'));
}

export default register;