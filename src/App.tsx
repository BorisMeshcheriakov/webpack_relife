import React, { lazy, Suspense } from 'react';
import { Close } from 'shared/assets';

// import { Footer } from './components';
const Footer = lazy(() => import('./components/Footer'));

import st from './App.scss';

const App: React.FC = () => {
	return (
		<div className={st.app}>
			<header className={st.header}>
				<h1>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates voluptatem facere,
					reprehenderit, tempora odio dolorum perspiciatis neque voluptate nesciunt voluptas quam
					cumque iste nam, minima nisi mollitia nulla cupiditate. Aliquam.
				</h1>
			</header>
			<div>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia deleniti, dolore beatae
					sit atque aliquam eius asperiores iste adipisci cupiditate aperiam praesentium vero. At
					fuga suscipit nulla a? Laboriosam, dolores.
				</p>
				<p>
					<button>Button</button>
				</p>
				<p>
					<a href="">Link</a>
				</p>
			</div>
			<Close />
			<Suspense fallback={<span>loading</span>}>
				<Footer />
			</Suspense>
		</div>
	);
};

export default App;
