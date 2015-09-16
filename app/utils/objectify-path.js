export default function objectifyPath(segments, prefix) {
  var object = {};
  if (prefix) {
    segments.replace(prefix, '');
  }
  segments.split('/').forEach(function(segment, index, segments) {
    if (index % 2 === 0 && segments[index + 1]) {
      object[segment] = segments[index + 1];
    }
  });
  return object;
}
