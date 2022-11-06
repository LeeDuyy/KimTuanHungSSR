/* eslint-disable camelcase */

export interface IConfigState {
    company_name: string,
    short_name: string,
    tax_code: string,
    tax_address: string,
    phone_number: string,
    hotline: string,
    email: string,
    facebook: string,
    zalo: string,
    clock: string,
    logo: string,
    logo_small: string,
    youtube: string,
    instagram: string,
    theme_color: string
}

export interface ConfigParamState {
    configState: IConfigState | null
}
