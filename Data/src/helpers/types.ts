export type RawUserData = {
    id: string;
    name: string;
    username: string;
};

export interface IUserDataWithProps extends RawUserData {
    linkId?: string;
	additionalProps?: additionalProps;
}

type additionalProps = {
	[key: string]: any;
}