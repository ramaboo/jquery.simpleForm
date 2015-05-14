module SimpleForm
  class ErrorMessage
    delegate :object, :object_name, :template, to: :@builder

    def initialize(builder, options)
      @builder = builder
      @options = options
    end

    def render
      return unless errors_present?
      template.content_tag :div, class: 'error-messages' do
        template.concat(template.content_tag :h2, template.pluralize(object.errors.full_messages.count, 'Error'))
        error_messages
      end
    end

    protected

    def errors_present?
      object.try(:errors).try(:present?)
    end

    def error_messages
      object.errors.full_messages.map do |msg|
        template.concat template.content_tag :p, msg
      end
    end
  end
end

module SimpleForm
  class FormBuilder < ActionView::Helpers::FormBuilder
    def error_messages(options = {})
      SimpleForm::ErrorMessage.new(self, options).render
    end
  end
end
