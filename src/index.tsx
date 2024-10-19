import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [formStyleState, setArticleState] = useState(defaultArticleState);

	const changeHandler = (newAppState: ArticleStateType) => {
		console.log('changeee');
		setArticleState(newAppState);
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': formStyleState.fontFamilyOption.value,
					'--font-size': formStyleState.fontSizeOption.value,
					'--font-color': formStyleState.fontColor.value,
					'--container-width': formStyleState.contentWidth.value,
					'--bg-color': formStyleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onChange={changeHandler} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
