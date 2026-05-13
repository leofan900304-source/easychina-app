declare module "qrcode" {
  interface QRCodeOptions {
    width?: number;
    margin?: number;
    color?: {
      dark?: string;
      light?: string;
    };
  }

  interface QRCodeToStringOptions extends QRCodeOptions {
    type?: "utf8" | "svg" | "terminal";
  }

  interface QRCode {
    toDataURL(
      text: string | Array<{ data: string; mode?: string }>,
      options?: QRCodeOptions
    ): Promise<string>;

    toString(
      text: string | Array<{ data: string; mode?: string }>,
      options?: QRCodeToStringOptions
    ): Promise<string>;

    toCanvas(
      canvas: HTMLCanvasElement,
      text: string | Array<{ data: string; mode?: string }>,
      options?: QRCodeOptions
    ): Promise<HTMLCanvasElement>;
  }

  const _default: QRCode;
  export default _default;
}
