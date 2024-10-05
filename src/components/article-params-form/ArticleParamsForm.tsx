import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

export const ArticleParamsForm = ({
	dataReturn,
}: {
	dataReturn: (articleState: ArticleStateType) => void;
}) => {
	//Открытие асайда
	const [isOpenedAside, setIsOpenedAside] = useState(false);
	//Изменение состояний выборов
	const [fontFamily, setFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [bgColor, setBgColor] = useState(defaultArticleState.backgroundColor);
	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);
	//Обработка нажатия на кнопку со стрелкой
	const handleClickArrowButton = () => {
		setIsOpenedAside((isOpenedAside) => !isOpenedAside);
	};
	//Обработка "Применить"
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const refreshedArticleState = {
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: bgColor,
			contentWidth: contentWidth,
		};
		dataReturn(refreshedArticleState);
		setIsOpenedAside(false);
	};
	//Обработка "Сбросить"
	const handleClear = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBgColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		dataReturn(defaultArticleState);
		setIsOpenedAside(false);
	};
	return (
		<>
			<ArrowButton isOpen={isOpenedAside} onClick={handleClickArrowButton} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpenedAside,
				})}>
				<form
					className={styles.form}
					style={{ gap: 50 }}
					onSubmit={handleSubmit}
					onReset={handleClear}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						onChange={(option) => setFontFamily(option)}
						selected={fontFamily}
						options={fontFamilyOptions}
						title={'Шрифт'}
					/>
					<RadioGroup
						onChange={(option) => setFontSize(option)}
						name={'radio'}
						options={fontSizeOptions}
						selected={fontSize}
						title={'Размер шрифта'}
					/>
					<Select
						onChange={(option) => setFontColor(option)}
						title={'Цвет шрифта'}
						selected={fontColor}
						options={fontColors}
					/>
					<Separator />
					<Select
						onChange={(option) => setBgColor(option)}
						title={'Цвет фона'}
						selected={bgColor}
						options={backgroundColors}
					/>
					<Select
						onChange={(option) => setContentWidth(option)}
						title={'Ширина контента'}
						selected={contentWidth}
						options={contentWidthArr}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
