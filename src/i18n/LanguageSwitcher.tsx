export interface LanguageSwitcherProps {
    currentLocale: string;
    onChangeLanguage: (value: string) => void;
}

export function LanguageSwitcher({currentLocale, onChangeLanguage}: LanguageSwitcherProps) {
    return (
        <div style={{fontSize: "24px", cursor: "pointer"}}>
      <span
          style={{
              margin: "0 10px",
              border: currentLocale === "en" ? "2px solid blue" : "none",
              padding: "5px",
              borderRadius: "5px",
          }}
          onClick={() => onChangeLanguage("en")}
      >
        🇺🇸
      </span>
            <span
                style={{
                    margin: "0 10px",
                    border: currentLocale === "ro" ? "2px solid blue" : "none",
                    padding: "5px",
                    borderRadius: "5px",
                }}
                onClick={() => onChangeLanguage("ro")}
            >
        🇷🇴
      </span>
        </div>
    );
}
