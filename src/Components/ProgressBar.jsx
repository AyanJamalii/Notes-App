// src/components/ProgressBar.jsx
import NProgress from 'nprogress';
import './ProgressBar.css';

const ProgressBar = {
  start: () => NProgress.start(),
  done: () => NProgress.done(),
};

export default ProgressBar;
