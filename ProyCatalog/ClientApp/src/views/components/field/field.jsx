import style from './field.module.css';

function Field(props) {
    const { valueField, setValueField, placeholder, label, type } = props;

    return (
        <div className={style.field}>
            <label>
                {label}
                <input
                    required
                    value={valueField}
                    onChange={e => setValueField(e.target.value)}
                    type={type}
                    placeholder={placeholder}
                />
            </label>
        </div>
    );
}

export { Field }