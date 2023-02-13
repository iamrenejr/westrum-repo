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

  const mad = 0.4327686;
  const median = 0.2091938;
  const deviation = Math.abs(median - refined);
  const threshold = 1.4826 * mad;
  const isOutlier = deviation > threshold;
  const tooLow = refined < median;
  const tooHigh = refined > median;
  const remark = tooLow ? 'Low' : tooHigh ? 'High' : 'Unknown case';

  return (
    <div className="results-page">
      <table>
        <thead>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>
              <b>Outlier</b>
            </td>
            <td>
              <b>Remark</b>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Unrefined</td>
            <td>{unrefined.toFixed(4)}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>Refined</td>
            <td>{refinedUnstdized.toFixed(4)}</td>
            <td>{isOutlier ? `Y` : 'N'}</td>
            <td>{isOutlier ? `${remark}` : '-'}</td>
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
          The refined and unrefined scores show the measurement of organizational culture as perceived by you. While we
          ultimately want this to be as high as it can go, it's also important that we capture this value accurately.
          The Outlier column shows if your refined score is too different from the "normal" response, and the Remark
          column shows if the result is too low or too high.
        </p>
        <p>
          You might want to reflect on this and see if it feels accurate for you. A low score may indicate that there
          are unseen cultural issues only you can perceive, and it may be a good idea to think about what these are and
          raise them. Conversely, a high score may indicate that an information blindspot exists for you, and it may be
          worth finding and addressing them.
        </p>
        <p>
          It's important to note that these are not the only causes of outliers. Ultimately, a conversation between you
          and others may be the best way to find these causes on an individual level.
        </p>
        <p>
          You can take this survey as many times as you feel you need. If you change your answers experimentally, you
          will get a new result each time. This might help you gain more intuition of how your answers influence your
          final score and what it means for organizational culture.
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
