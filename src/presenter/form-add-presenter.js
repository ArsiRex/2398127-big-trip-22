import { render, RenderPosition, remove } from '../framework/render.js';
import { UserAction, UpdateType, NEW_POINT } from '../const.js';
import EditFormView from '../view/form-edit-view.js';
export default class FormAddPresenter {
  #pointsModel = null;
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #handleCancel = null;
  #availableDestinations = null;
  #availableOffers = null;
  #editFormComponent = null;

  constructor({pointsModel, pointListContainer, onDataChange, onDestroy, onCancelClick, availableDestinations, availableOffers }) {
    this.#pointsModel = pointsModel;
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#handleCancel = onCancelClick;
    this.#availableDestinations = availableDestinations;
    this.#availableOffers = availableOffers;
  }

  init(point = NEW_POINT) {
    if (this.#editFormComponent !== null) {
      return;
    }

    this.#editFormComponent = new EditFormView({
      point: point,
      pointsModel: this.#pointsModel,
      availableDestinations: this.#availableDestinations,
      availableOffers: this.#availableOffers || [],
      checkedOffers: [],
      onEditClick: this.#handleCloseClick,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleCancelClick,
      isNew: true
    });
    render(this.#editFormComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#editFormComponent === null) {
      return;
    }

    if (this.#handleDestroy) {
      this.#handleDestroy();
    }

    remove(this.#editFormComponent);
    this.#editFormComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#editFormComponent.updateElement({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#editFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this.#editFormComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleCloseClick = () => {
    this.destroy();
    this.#handleCancel?.();
  };

  #handleCancelClick = () => {
    this.destroy();
    this.#handleCancel?.();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
      this.#handleCancel?.();
    }
  };
}
