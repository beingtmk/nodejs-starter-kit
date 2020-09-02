import QuestionTypes from "@gqlapp/quiz-common/constants/QuestionTypes";


export const getResult = (record, attempt) => {
    if (
      record.choiceType === QuestionTypes.TEXTBOX ||
      record.choiceType === QuestionTypes.TEXTAREA ||
      record.choiceType === QuestionTypes.NUMBER ||
      record.choiceType === QuestionTypes.SLIDER ||
      record.choiceType === QuestionTypes.COUNTRIES
    ) {
      const result =
      attempt && attempt.answers &&
        attempt.answers.find((anS) => anS.questionId === record.id);
      // record &&
      // record.answers &&
      // record.answers.length !== 0 &&
      // record.answers.find((res) => res.userId === id);
      // console.log('result', result);
      return result && result.content;
    } else {
      const result =
      attempt && attempt.answers &&
        attempt.answers.filter((res) => res.questionId === record.id);
      let choiceIdArray = [];

      result && result.forEach((answer) => {
        choiceIdArray.push(answer.choiceId);
      });
      const choice = record.choices.filter((c) => choiceIdArray.includes(c.id));
      const choiceLength = choice.length;

      return choice.map(
        (ch, i) =>
          `${ch.description}${
            choiceLength > 1 && choiceLength > i + 1 ? ", " : ""
          }`
      );
    }
  };