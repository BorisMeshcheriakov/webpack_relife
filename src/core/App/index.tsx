import Loader from './Loader';
import Routes from './Routes';

const App = () => {
	return (
		<>
			{window.location.pathname !== '/technical-service' && <Loader />}
			<Routes />
		</>
	);
};

export default App;
