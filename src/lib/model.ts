type FormatOption = { value: number | string; text: string };
type ToFormat = (v: number | string, t: string) => FormatOption;
const toFormat: ToFormat = (v, t) => ({ value: v, text: t });

export const surveyModel = {
  elements: [
    {
      type: 'matrix',
      name: 'QS',
      title: 'Westrum Survey',
      columns: [
        toFormat(1, 'Strongly disagree'),
        toFormat(2, 'Disagree'),
        toFormat(3, 'Somewhat disagree'),
        toFormat(4, 'Neither agree nor disagree'),
        toFormat(5, 'Somewhat agree'),
        toFormat(6, 'Agree'),
        toFormat(7, 'Strongly agree'),
      ],
      rows: [
        toFormat('Q1', 'On my team, information is actively sought.'),
        toFormat('Q2', 'Messengers are not punished when they deliver news of failures or other bad news.'),
        toFormat('Q3', 'On my team, responsibilities are shared.'),
        toFormat('Q4', 'On my team, cross-functional collaboration is encouraged and rewarded.'),
        toFormat('Q5', 'On my team, failure causes inquiry.'),
        toFormat('Q6', 'On my team, new ideas are welcomed.'),
        toFormat('Q7', 'On my team, failures are treated primarily as opportunities to improve the system.'),
      ],
      alternateRows: true,
      isAllRowRequired: true,
    },
  ],
  showQuestionNumbers: 'off',
};
