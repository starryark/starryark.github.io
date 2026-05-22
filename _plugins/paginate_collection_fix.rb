# Allows jekyll-paginate-v2 to use _tabs/ collection documents as pagination templates.
#
# jekyll-paginate-v2 only scans site.pages (Jekyll::Page objects), but Chirpy's tab
# pages are Jekyll::Document objects in site.collections['tabs']. This generator runs
# before v2 (priority :high vs v2's :lowest) and temporarily adds any tabs document
# with `pagination: enabled: true` to site.pages so v2 can discover it.
#
# It also overrides write? to false on those documents so Jekyll doesn't write the
# raw collection output and overwrite the paginated page 1 that v2 generates.
# The document's published? remains true so it still appears in site.tabs for sidebar nav.

module PaginateCollectionFix
  class Generator < Jekyll::Generator
    safe true
    priority :high

    def generate(site)
      site.collections.each do |_name, collection|
        next if collection.label == 'posts'
        collection.docs.each do |doc|
          next unless doc.data.dig('pagination', 'enabled')
          site.pages << doc unless site.pages.include?(doc)
          doc.define_singleton_method(:write?) { false }
        end
      end
    end
  end
end
