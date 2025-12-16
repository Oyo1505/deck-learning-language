import { useTranslation } from "react-i18next";

const SUPPORTED_LANGUAGES = ["en", "ja", "fr"] as const;

const SelectLang = () => {
	const { i18n } = useTranslation();
	const changeLanguageHandler = (lang: string) => {
		if (
			SUPPORTED_LANGUAGES.includes(lang as (typeof SUPPORTED_LANGUAGES)[number])
		) {
			i18n.changeLanguage(lang);
		}
	};

	return (
		<select
			data-testid="select-lang"
			onChange={(e) => changeLanguageHandler(e.target.value)}
			value={i18n.language}
		>
			<option value="en">English</option>
			<option value="ja">Japanese</option>
			<option value="fr">French</option>
		</select>
	);
};

export default SelectLang;
