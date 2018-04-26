import $ from 'jquery';
import 'jquery-validation';

export default (form, options) => {
  options.focusCleanup = options.focusCleanup || true;
  $(form).validate(options);
}
