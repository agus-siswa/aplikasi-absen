const bindInput = ({ target, setForm, form }) => {
    // ambil value dan name dari html
    const { name, value } = target
    // copy data form
    let _form = structuredClone(form)
    // ubah value object form
    _form[name] = value
    // simpan ke form
    setForm(prev => ({
        ...prev,
        form: _form
    }))

}

export default bindInput