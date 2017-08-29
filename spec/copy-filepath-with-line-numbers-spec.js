'use babel';

import CopyFilepathWithLineNumbers from '../lib/copy-filepath-with-line-numbers';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('CopyFilepathWithLineNumbers', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('copy-filepath-with-line-numbers');
  });

  describe('when the copy-filepath-with-line-numbers:relative event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.copy-filepath-with-line-numbers')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'copy-filepath-with-line-numbers:relative');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.copy-filepath-with-line-numbers')).toExist();

        let copyFilepathWithLineNumbersElement = workspaceElement.querySelector('.copy-filepath-with-line-numbers');
        expect(copyFilepathWithLineNumbersElement).toExist();

        let copyFilepathWithLineNumbersPanel = atom.workspace.panelForItem(copyFilepathWithLineNumbersElement);
        expect(copyFilepathWithLineNumbersPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'copy-filepath-with-line-numbers:relative');
        expect(copyFilepathWithLineNumbersPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.copy-filepath-with-line-numbers')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'copy-filepath-with-line-numbers:relative');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let copyFilepathWithLineNumbersElement = workspaceElement.querySelector('.copy-filepath-with-line-numbers');
        expect(copyFilepathWithLineNumbersElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'copy-filepath-with-line-numbers:relative');
        expect(copyFilepathWithLineNumbersElement).not.toBeVisible();
      });
    });
  });
});
