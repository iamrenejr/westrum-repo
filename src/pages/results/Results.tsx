import './Results.css';

import { RESULTS_DATA_KEY } from '../../lib/constants';

const Results = () => {
  const sum = (a: number, b: number) => a + b;
  const means = [5.76, 6.28, 6.04, 5.64, 4.96, 6.56, 5.76];
  const mean_all = 5.857143;
  const sds = [1.1647603, 0.9797959, 0.8888194, 1.2206556, 1.3063945, 0.5830952, 1.1647603];
  const sd_all = 1.153278;
  const weights = [0.43193918, 0.05830026, 0.14548017, 0.13907955, 0.09521775, 0.17888269, 0.11362975];
  const stdize = (val: number, idx: number) => (val - means[idx]) / sds[idx];
  const wghtsum = (val: number, idx: number) => weights[idx] * stdize(val, idx);

  const { QS } = JSON.parse(sessionStorage.getItem(RESULTS_DATA_KEY) ?? '');

  const values: number[] = Object.values(QS);
  const unrefined = values.reduce(sum, 0) / values.length;
  const refined = values.map(wghtsum).reduce(sum, 0);
  const refinedUnstdized = mean_all + refined * sd_all;

  return (
    <div className="results-page">
      <table>
        <tbody>
          <tr>
            <td>Unrefined</td>
            <td>{unrefined.toFixed(4)} ± 0.3881</td>
          </tr>
          <tr>
            <td>Refined</td>
            <td>{refinedUnstdized.toFixed(4)} ± 0.4483</td>
          </tr>
        </tbody>
      </table>
      <div className="explanation">
        <p>
          The scores measure organizational culture as perceive perceived by you. Please note that this score is 100%
          confidential. Only you know it, and you are not expected to share it with anyone else.
        </p>
        <p>
          Organizational culture is a spectrum, and it's important not to put too much stock in its exact value. Think
          of it as a fuzzy indicator that can roughly show where you think we are on the Westrum scale.
        </p>
        <p>
          <b>How to Use</b>
        </p>
        <p>
          Generally, higher scores mean a stronger culture of collaboration. As a rule of thumb, a value of 5 or above
          can be considered good.
        </p>
        <p>
          Your result comes with an error term (the number after the ± sign), which shows the range your "true" result
          is likely to be in. For example, a score of 5±1 means that it is likely to be at least 4, and at most 6. For
          simplification purposes, this error term is fixed at 0.3881 for the unrefined method, and 0.4483 for the
          refined method.
        </p>
        <p>
          You might want to reflect on this and see if it feels accurate for you. A low score might indicate that there
          are cultural issues you perceive that are going unresolved, and it may be a good idea to think about what
          these are and raise them.
        </p>
        <p>
          You can take this survey as many times as you feel you need, changing your answers experimentally, and you
          will get a new result each time. This might help you gain more intuition of how your answers to the questions
          influence your final score and what it means for organizational culture.
        </p>
        <p className="other-notes">Other Notes</p>
        <p>
          The unrefined metric is a simple average over all the answers to the questions. It ranges from 1 (most
          pathological) to 7 (most generative). All questions have equal weight. It is easy to understand and present,
          but not necessarily reliable or future-proof.
        </p>
        <p>
          The refined metric takes into account the weights of each question based on the model generated from the
          study. It's usually standardized so that it can be used across studies, but in this case, it's shown in an
          unstandardized form to make it easier to compare to the unrefined method.
        </p>
        <p>
          For a more in-depth discussion of refined vs unrefined methods,{' '}
          <a href="https://scholarworks.umass.edu/cgi/viewcontent.cgi?article=1226&context=pare">this paper</a> may be
          helpful.
        </p>
      </div>
    </div>
  );
};

export default Results;
