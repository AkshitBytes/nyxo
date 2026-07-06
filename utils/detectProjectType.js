import fs from 'fs';
import path from 'path';

function detectProjectType(projectDir) {
  const pkgPath = path.join(projectDir, 'package.json');

  if (!fs.existsSync(pkgPath)) {
    return { type: 'unknown', entryPoint: null, buildCommand: null };
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };

  if (deps.express) {
    return {
      type: 'backend',
      entryPoint: pkg.main || 'index.js',
      buildCommand: null
    };
  }

  if (deps.react && (deps.vite || deps['react-scripts'])) {
    return {
      type: 'frontend',
      entryPoint: null,
      buildCommand: pkg.scripts?.build || 'npm run build'
    };
  }

  return { type: 'unknown', entryPoint: null, buildCommand: null };
}

export default detectProjectType;