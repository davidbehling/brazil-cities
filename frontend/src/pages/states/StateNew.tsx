import StateForm from "../../components/StateForm";
import translations from "../../i18n";

const t = translations;

function StateNew() {
  return <StateForm title={t.new_state} />;
}

export default StateNew;
