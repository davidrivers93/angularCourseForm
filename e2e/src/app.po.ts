import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText();
  }

  async getFormItemByFormControlName(
    controlName: string
  ): Promise<ElementFinder> {
    by.addLocator(
      'formControlName',
      function (value, opt_parentElement, opt_rootSelector) {
        var using = opt_parentElement || document;

        return using.querySelectorAll('[formControlName="' + value + '"]');
      }
    );

    return element(by.formControlName(controlName));
  }

  async getItemByCss(css: string): Promise<ElementFinder> {
    return element(by.css(css));
  }

  async getButtonByText(text: string) {
    return element(by.buttonText(text));
  }

  async getItemByPlaceholder(placeholder: string) {
    return element(by.css(`[placeholder = ${placeholder}]`));
  }
}
