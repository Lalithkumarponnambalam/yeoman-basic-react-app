import Generator from "yeoman-generator";

export default class BasicAppGenerator extends Generator {
  name = "basic-react-app";
  reactVersion = "18.2.0";
  stylingFramework = "tailwindcss";

  constructor(args, opts) {
    super(args, opts);
    this.argument("appname", { type: String, required: false });
  }

  async prompting() {
    console.log("Prompting...");
    this.answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.name,
        store: true,
      },
      {
        type: "list",
        name: "templateType",
        message: "Select the template wanted:",
        choices: [
          "Front-End React",
          "Node API builder",
          "FullStack Application",
        ],
      },
      {
        type: "input",
        name: "reactVersion",
        message: "Specify the react version you want to use",
        default: this.reactVersion,
        store: true,
      },
      {
        type: "list",
        name: "reactTemplate",
        message: "Select the react template you want to use:",
        choices: [
          "JSX",
          "TSX"
        ],
      }
    ]);
  }

  writing() {
    console.log("Writing files...");
    if (this.answers.templateType === "Front-End React") {
      this._writingReactTemplate();
    }
  }

  _writingReactTemplate() {
    console.log("Copying React template...");
    const extension = this.answers.reactTemplate === "JSX" ? "jsx" : "tsx";

    // core files means app, index, app.test kind of files
    const coreFilesExtension = this.answers.reactTemplate === "JSX" ? "js" : "tsx";
    const envExtension = this.answers.reactTemplate === "JSX" ? "js" : "ts"
  
    const templatePaths = [
      "../../templates/frontend/public/index.html.ejs",
      "../../templates/frontend/public/favicon.ico.ejs",
      `../../templates/frontend/src/components/Home/Home.ejs`,
      `../../templates/frontend/src/components/Home/About.ejs`,
      `../../templates/frontend/src/components/Home/Features.ejs`,
      `../../templates/frontend/src/components/Home/Pricing.ejs`,
      `../../templates/frontend/src/components/Home/Blog.ejs`,
      `../../templates/frontend/src/components/Shared/Navbar.ejs`,
      `../../templates/frontend/src/App.ejs`,
      `../../templates/frontend/src/App.test.ejs`,
      "../../templates/frontend/src/index.css.ejs",
      `../../templates/frontend/src/index.ejs`,
      `../../templates/frontend/src/reportWebVitals.ejs`,
      `../../templates/frontend/src/setupTests.ejs`,
      "../../templates/frontend/src/styles.css.ejs",
      "../../templates/frontend/.gitignore.ejs",
      "../../templates/frontend/package.json.ejs",
      "../../templates/frontend/README.md.ejs",
      "../../templates/frontend/tailwind.config.js.ejs",
    ];
  
    const destinationPaths = [
      this.answers.name + "/public/index.html",
      this.answers.name + "/public/favicon.ico",
      `${this.answers.name}/src/components/Home/Home.${extension}`,
      `${this.answers.name}/src/components/Home/About.${extension}`,
      `${this.answers.name}/src/components/Home/Features.${extension}`,
      `${this.answers.name}/src/components/Home/Pricing.${extension}`,
      `${this.answers.name}/src/components/Home/Blog.${extension}`,
      this.answers.name + `/src/components/Shared/Navbar.${extension}`,
      this.answers.name + `/src/App.${coreFilesExtension}`,
      this.answers.name + `/src/App.test.${coreFilesExtension}`,
      this.answers.name + "/src/index.css",
      this.answers.name + `/src/index.${coreFilesExtension}`,
      this.answers.name + `/src/reportWebVitals.${envExtension}`,
      this.answers.name + `/src/setupTests.${envExtension}`,
      this.answers.name + "/src/styles.css",
      this.answers.name + "/.gitignore",
      this.answers.name + "/package.json",
      this.answers.name + "/README.md",
      this.answers.name + "/tailwind.config.js",
    ];

    if (this.answers.reactTemplate === "TSX") {
      templatePaths.push("../../templates/frontend/tsconfig.json.ejs");
      destinationPaths.push(`${this.answers.name}/tsconfig.json`);
      templatePaths.push("../../templates/frontend/react-app-env.d.ts.ejs");
      destinationPaths.push(`${this.answers.name}/react-app-env.d.ts`);
    }
  
  
    templatePaths.forEach((templatePath, index) => {
      this.fs.copyTpl(
        this.templatePath(templatePath),
        this.destinationPath(destinationPaths[index]),
        {
          title: this.answers.name,
          name: this.nameConversion(this.answers.name),
          reactVersion: this.answers.reactVersion,
          reactDomVersion: this.answers.reactVersion,
          reactTemplate: this.answers.reactTemplate,
        }
      );
    });
  }

  nameConversion(name) {
    if (name) {
      // Replace spaces with -
      let convertedName = name.replace(/\s+/g, "-");

      // Convert to lowercase
      convertedName = convertedName.toLowerCase();

      return convertedName;
    } else {
      return "";
    }
  }
}
