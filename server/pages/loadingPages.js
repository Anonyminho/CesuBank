import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

class PagesController {
  async home(req, res) {
    const page = fs.readFileSync(
      path.join(__dirname, 'public', 'index.html'),
      'utf8',
    );

    res.send(page);
  }
}

export default new PagesController();
