---
date:   2017-03-13
categories: tip,how-to
---

# Setting up macOS front-end environment

First.. I'm a macintosh user, so if you're using Linux or Windows, this guide might be hard to follow step-by-step. Second; this guide is very opinionated and just shows how I prefer to set up my system.

![Planet Dev]({{ site.baseurl }}/assets/images/journal-planet-dev.png)

## Oh my zsh!

Ok, this is probably not the most important step, but as a developer, you're spending a lot of your time inside the terminal, so let's make it good.

![Hyper Terminal Screenshot]({{ site.baseurl }}/assets/images/journal-hyper-terminal.jpg)

First step is to install latest version of zsh:

```bash
$ brew install zsh
```

To extend zsh, we use Oh My Zsh! Which helps us customize our shell with themes and plug-ins.

```bash
$ sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

I like having my prompt clean, so mine looks like this: `→ _` without all the extra info.
To get that, you can copy the line below and past it into the bottom of your `~/.zshrc` file.

```bash
PROMPT='→  '
```

Optional: Instead of using the standard macOS terminal, let's join the cool kids and install the new super hackable Hyper Terminal 😎

```bash
$ brew cask install hyper
```

Hyper can be tweaked in every imaginable way, but I will just post my preferred setup for now. If you want more – you should check out this [awesome](https://github.com/bnb/awesome-hyper) collection.

## Xcode Command Line Tools

This step is required before we start installing anything else, if you already have the full Xcode app installed on your machine, you can skip this step.

To install the Xcode Command Line Tools, run the following command in your terminal (without `$`):

```bash
$ xcode-select --install
```

A dialog box will open after you enter the command, make sure you click install.

## Homebrew

Homebrew is the most popular package manager for macOS, we will use this to install tools throughout this guide.

```bash
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

## Git

macOS comes with git built-in, but it's outdated - so let's install it via Homebrew:

```bash
$ brew install git
```

If you don't already have a GitHub account, go to [gitbub.com](https://github.com/) and set one up first.

Next, we need to register your credentials on your machine so you don't have to enter your username and password every time you push to your repositories.

Type in your name so that git can properly label your commits:

```bash
$ git config --global user.name "YOUR NAME"
```

Next, add your email associated with your github account:

```bash
$ git config --global user.email "YOUR EMAIL ADDRESS"
```

## Ruby with RVM

To install Ruby, I recommend that you do so with a version manager like RVM (Ruby Version Manager), with RVM you can easily manage multiple versions of Ruby on your machine.

The following command will install RVM as well as the latest stable version of Ruby.

```bash
$ \curl -sSL https://get.rvm.io | bash -s stable --ruby
```

## Node with NVM

Just like Ruby, Node should be installed with a version manager, so let's install NVM:

```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
```

Now, let's download the latest version of Node:

```bash
$ nvm install node
```

If you need to install other versions of Node, you can do so by running `nvm install [version]` and to swap versions by running `nvm use [version]`.

## Atom

No back to some more fun stuff! My editor of choice is Atom (Developed by GitHub), if you're using Sublime, some of these packages / themes might be available there as well.

### Install Atom

```
brew cask install atom
```

After install, you should open and close Atom so it installs the CLI tools before we proceed.

To check and see if the Atom shell commands got installed, run `which atom`. You should see the path printed like this:

```bash
$ which atom
/usr/local/bin/atom
$   
```

If it was not, open Atom and hit `Cmd+Shift+P` and paste in `Window: Install Shell Commands`, which will prompt you for an administrator password.

### Atom Settings

Let's change some of the default settings

#### Type settings

- Typeface: [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono)
- Size: 14 (Default)
- Line height: 1.58

#### Scroll past end

A neat little checkbox you should check is scroll past end, it makes it possible to get that last bit of code up in the middle of the screen so it's easier to work with.

`Settings > Editor > Scroll Past End (Check)`

#### Show indent guide

By showing the indentation guide, it's easier to read nested code.

`Settings > Editor > Show Indent Guide (Check)`

### Install packages

#### Emmet
Bring your coding productivity to the next level by writing shortcuts.

`.card>h3.card--title+span.card--description` will output:

```html
<div class="card">
  <h3 class="card--title"></h3>
  <span class="card--description"></span>
</div>
```

Install:

```bash
$ apm install emmet
```

#### Pigments
Pigments is a color tool that shows you the colors from each color value in your code,
you can choose how it's displayed in settings — I usually set it do dot.

It can do a whole lot more, so make sure you take a look at the package info.

Install:

```bash
$ apm install pigments
```

I created this small snippet that you can put in your Atom stylesheet to turn that "dot" into a droplet.

```css
/* Pigments Droplet */
atom-text-editor pigments-markers pigments-color-marker.dot,
atom-text-editor pigments-markers pigments-color-marker.dot,
atom-text-editor pigments-color-marker.dot {
  transform: translate(0%, -50%) scale(.6) rotate(45deg);
  border-top-left-radius: 0;
  border-top-right-radius: 75px;
  border-bottom-right-radius: 75px;
  border-bottom-left-radius: 75px;
}
```

#### Minimap

```bash
$ apm install minimap
```

#### Color-picker

```bash
$ apm install color-picker
```
