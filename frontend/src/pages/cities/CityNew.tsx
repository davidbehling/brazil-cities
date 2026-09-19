import CityForm from "../../components/CityForm";
import translations from "../../i18n";

const t = translations;

function CityNew() {
  return <CityForm title={t.new_city} />;
}

export default CityNew;