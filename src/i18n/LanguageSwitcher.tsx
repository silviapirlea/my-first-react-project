
export function LanguageSwitcher(props: { currentLocale: string, onChangeLanguage: any })  {
    return (
        <div style={{ fontSize: '24px', cursor: 'pointer' }}>
            <span
                style={{
                    margin: '0 10px',
                    border: props.currentLocale === 'en' ? '2px solid blue' : 'none',
                    padding: '5px',
                    borderRadius: '5px',
                }}
                onClick={() => props.onChangeLanguage('en')}
            >
        🇺🇸
      </span>
            <span
                style={{
                    margin: '0 10px',
                    border: props.currentLocale === 'ro' ? '2px solid blue' : 'none',
                    padding: '5px',
                    borderRadius: '5px',
                }}
                onClick={() => props.onChangeLanguage('ro')}
            >
        🇷🇴
      </span>
        </div>
    );
};

