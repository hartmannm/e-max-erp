export default interface ICrypto {

  encrypt(content: string): Promise<string>;

  compare(encrypetdContent: string, contentToCompare: string): Promise<boolean>;

}
