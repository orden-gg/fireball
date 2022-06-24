import { styles } from './styles';

export function ShineLabel({ text }: { text: string }) {
    const classes = styles();

    return (
        <div className={classes.labelWrapper}>
            {text.split('').map((c, i) => (
                <span className={classes.label} key={i} style={{ animationDelay: `${-i * 0.04}s` }}>
                    {c === ' ' ? <>&nbsp;</> : c}
                </span>
            ))}
        </div>
    );
}
