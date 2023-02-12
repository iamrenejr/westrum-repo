import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';
import { RESULTS_DATA_KEY, paths } from '../../lib/constants';
import { surveyModel } from '../../lib/model';
import './App.css';
import 'survey-core/defaultV2.min.css';

const App = () => {
  const navigate = useNavigate();
  const survey = new Model(surveyModel);

  const saveResults = useCallback(
    (sender: any) => {
      const results = JSON.stringify(sender.data);
      sessionStorage.setItem(RESULTS_DATA_KEY, results);
      navigate(paths.results);
    },
    [navigate]
  );

  survey.onComplete.add(saveResults);

  return (
    <div className="App">
      <Survey model={survey} />
    </div>
  );
};

export default App;
