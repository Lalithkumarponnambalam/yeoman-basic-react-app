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
    const templatePaths = [
      "../../templates/frontend/public/index.html.ejs",
      "../../templates/frontend/public/favicon.ico.ejs",
      "../../templates/frontend/src/components/Home/Home.jsx.ejs",
      "../../templates/frontend/src/components/Home/About.jsx.ejs",
      "../../templates/frontend/src/components/Home/Features.jsx.ejs",
      "../../templates/frontend/src/components/Home/Pricing.jsx.ejs",
      "../../templates/frontend/src/components/Home/Blog.jsx.ejs",
      "../../templates/frontend/src/components/Shared/Navbar.jsx.ejs",
      "../../templates/frontend/src/App.js.ejs",
      "../../templates/frontend/src/App.test.js.ejs",
      "../../templates/frontend/src/index.css.ejs",
      "../../templates/frontend/src/index.js.ejs",
      "../../templates/frontend/src/reportWebVitals.js.ejs",
      "../../templates/frontend/src/setupTests.js.ejs",
      "../../templates/frontend/src/styles.css.ejs",
      "../../templates/frontend/.gitignore.ejs",
      "../../templates/frontend/package.json.ejs",
      "../../templates/frontend/Readme.md.ejs",
      "../../templates/frontend/tailwind.config.js.ejs",
    ];

    const destinationPaths = [
      this.answers.name + "/public/index.html",
      this.answers.name + "/public/favicon.ico",
      this.answers.name + "/src/components/Home/Home.jsx",
      this.answers.name + "/src/components/Home/About.jsx",
      this.answers.name + "/src/components/Home/Features.jsx",
      this.answers.name + "/src/components/Home/Pricing.jsx",
      this.answers.name + "/src/components/Home/Blog.jsx",
      this.answers.name + "/src/components/Shared/Navbar.jsx",
      this.answers.name + "/src/App.js",
      this.answers.name + "/src/App.test.js",
      this.answers.name + "/src/index.css",
      this.answers.name + "/src/index.js",
      this.answers.name + "/src/reportWebVitals.js",
      this.answers.name + "/src/setupTests.js",
      this.answers.name + "/src/styles.css",
      this.answers.name + "/.gitignore",
      this.answers.name + "/package.json",
      this.answers.name + "/Readme.md",
      this.answers.name + "/tailwind.config.js",
    ];

    templatePaths.forEach((templatePath, index) => {
      this.fs.copyTpl(
        this.templatePath(templatePath),
        this.destinationPath(destinationPaths[index]),
        {
          title: this.answers.name,
          name: this.nameConversion(this.answers.name),
          reactVersion: this.answers.reactVersion,
          reactDomVersion: this.answers.reactVersion,
          stylingFramework: this.answers.stylingFramework,
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
