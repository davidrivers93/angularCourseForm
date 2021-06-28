import { browser, logging } from 'protractor';
import { AppPage } from './app.po';

describe('Angular Course App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should send the form', async () => {
    await page.navigateTo();

    const nextButton = await page.getButtonByText('Siguiente');
    const age = await page.getItemByPlaceholder('Edad');
    const name = await page.getItemByPlaceholder('Nombre');

    expect(nextButton.isEnabled()).toBe(false);
    await age.sendKeys(22);
    await name.sendKeys('David');

    expect(age).toBeDefined();
    expect(name).toBeDefined();
    expect(nextButton.isEnabled()).toBe(true);
  });

  it('Should fill second form step', async () => {
    const nextButton = await page.getButtonByText('Siguiente');
    await nextButton.click();

    const password = await page.getItemByPlaceholder('Contraseña');
    const confirmPassword = await page.getFormItemByFormControlName(
      'confirmPassword'
    );

    expect(nextButton.isEnabled()).toBe(false);
    password.sendKeys('12');
    confirmPassword.sendKeys('12');

    expect(password).toBeDefined();
    expect(confirmPassword).toBeDefined();
    expect(nextButton.isEnabled()).toBe(true);
  });

  it('Should fill third form step', async () => {
    const nextButton = await page.getButtonByText('Siguiente');
    await nextButton.click();

    const location = await page.getItemByPlaceholder('Dirección');
    const city = await page.getItemByPlaceholder('Ciudad');
    const country = await page.getItemByPlaceholder('País');
    const postalCode = await page.getFormItemByFormControlName('postalCode');

    location.sendKeys('12');
    city.sendKeys('12');
    country.sendKeys('12');
    postalCode.sendKeys(12345);

    expect(location).toBeDefined();
    expect(city).toBeDefined();
    expect(country).toBeDefined();
    expect(postalCode).toBeDefined();

    const submitButton = await page.getButtonByText('Guardar');
    expect(submitButton.isEnabled()).toBe(true);
    submitButton.click();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });
});
