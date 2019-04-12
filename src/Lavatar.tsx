import { Component, Prop } from "@stencil/core";

@Component({ tag: "rich-lavatar" })
export class Lavatar {
  @Prop() alt?: string;
  @Prop() background?: string;
  @Prop() bold?: boolean;
  @Prop() color?: string;
  @Prop() length?: number;
  @Prop() lowercase?: boolean;
  @Prop() name = "";
  @Prop() percent?: number;
  @Prop() protocol?: "http" | "https";
  @Prop() rounded?: boolean;
  @Prop() size?: number;
  @Prop() uppercase?: boolean;

  render() {
    const scheme = this.protocol ? `${this.protocol}://` : "//";

    const params = {
      background: this.background,
      bold: this.bold,
      color: this.color,
      "font-size": this.percent && this.percent / 100,
      length: this.length,
      name: this.name,
      rounded: this.rounded,
      size: this.size,
      uppercase: this.uppercase ? "true" : "false",
    };

    if (params.background && params.background[0] === "#") {
      params.background = params.background.slice(1);
    }

    if (params.color && params.color[0] === "#") {
      params.color = params.color.slice(1);
    }

    if (this.lowercase) {
      params.name = params.name.toLocaleLowerCase();
    } else if (this.uppercase) {
      params.name = params.name.toLocaleUpperCase();
    }

    const queryString = Object.entries(params)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => `${k}=${v}`)
      .join("&");

    const src = `${scheme}ui-avatars.com/api/?${queryString}`;

    return <img src={src} alt={this.alt || "letters avatar"} />;
  }
}
