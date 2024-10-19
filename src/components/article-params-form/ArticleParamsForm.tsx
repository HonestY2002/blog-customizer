import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';

import { useRef, useState } from 'react';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { Separator } from '../separator';
import { Spacer } from '../spacer';

interface ArticleParamsFormProps {
	onChange?: (data: ArticleStateType) => void;
}

export const ArticleParamsForm = ({ onChange }: ArticleParamsFormProps) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [selectedFont, setFont] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [selectedFontSize, setFontSize] = useState(
		defaultArticleState.fontSizeOption
	);
	const [selectedFontColor, setFontColor] = useState(
		defaultArticleState.fontColor
	);
	const [selectedBackgroundColor, setBgColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [selectedWidthContent, setWidthContent] = useState(
		defaultArticleState.contentWidth
	);

	const rootRef = useRef<HTMLDivElement>(null);
	const standartStyles = useRef(defaultArticleState);

	useOutsideClickClose({
		isOpen: sidebarOpen,
		rootRef: rootRef,

		onClose: () => {
			setFont(standartStyles.current.fontFamilyOption);
			setFontSize(standartStyles.current.fontSizeOption);
			setFontColor(standartStyles.current.fontColor);
			setBgColor(standartStyles.current.backgroundColor);
			setWidthContent(standartStyles.current.contentWidth);
		},

		onChange: setSidebarOpen,
	});

	const openSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		standartStyles.current = {
			fontFamilyOption: selectedFont,
			fontColor: selectedFontColor,
			backgroundColor: selectedBackgroundColor,
			contentWidth: selectedWidthContent,
			fontSizeOption: selectedFontSize,
		};

		if (onChange) {
			onChange(standartStyles.current);
		}
	};

	const resetHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFontColor(defaultArticleState.fontColor);
		setFont(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setBgColor(defaultArticleState.backgroundColor);
		setWidthContent(defaultArticleState.contentWidth);

		if (onChange) {
			onChange(defaultArticleState);
		}
	};

	return (
		<div ref={rootRef}>
			<ArrowButton onClick={openSidebar} />
			<aside
				className={`${styles.container} ${
					sidebarOpen ? styles.container_open : ''
				}`}>
				<form
					className={styles.form}
					onSubmit={submitHandler}
					onReset={resetHandler}>
					<Select
						selected={selectedFont}
						onChange={setFont}
						options={fontFamilyOptions}
						title='шрифт'
					/>

					<Spacer />

					<RadioGroup
						selected={selectedFontSize}
						name='radio'
						onChange={setFontSize}
						options={fontSizeOptions}
						title='размер шрифта'
					/>

					<Spacer />

					<Select
						selected={selectedFontColor}
						onChange={setFontColor}
						options={fontColors}
						title='цвет шрифта'
					/>

					<Spacer />

					<Separator />

					<Spacer />

					<Select
						selected={selectedBackgroundColor}
						onChange={setBgColor}
						options={backgroundColors}
						title='цвет фона'
					/>

					<Spacer />

					<Select
						selected={selectedWidthContent}
						onChange={setWidthContent}
						options={contentWidthArr}
						title='ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
